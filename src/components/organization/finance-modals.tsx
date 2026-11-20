"use client";

import { useState, useEffect } from "react";
import { MockStoreData, User, FundRequest } from "@/types/domain";
import {
  mutateStore,
  addActivityHistory,
  addAuditEvent,
} from "@/lib/mock/store";
import { EditorialModal } from "@/components/ui/editorial-modal";
import {
  Send,
  Upload,
  CheckCircle2,
  AlertCircle,
  FileImage,
  X,
  Banknote,
} from "lucide-react";

const INCOME_CATEGORIES = [
  "Dana dari Bendum",
  "Penjualan Tiket",
  "Sponsorship",
  "Donasi",
  "Iuran & Kas Organisasi",
  "Pemasukan Lainnya",
];

const EXPENSE_CATEGORIES = [
  "Konsumsi",
  "Transportasi",
  "Perlengkapan",
  "Publikasi & Dekorasi",
  "Honor Pembicara / Sewa Venue",
  "Pengeluaran Lainnya",
];

const FUND_STATUS_LABELS: Record<string, string> = {
  draft: "Draf",
  submitted: "Menunggu Review Bendum",
  in_review: "Diperiksa Bendum",
  revision: "Perlu Revisi",
  approved: "Disetujui (Siap Cair)",
  partially_disbursed: "Cair Sebagian",
  fully_disbursed: "Sudah Ditransfer (Menunggu Konfirmasi Unit)",
  settled: "Settled (Diterima Unit)",
  rejected: "Ditolak",
};

interface CreateFundRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: MockStoreData;
  currentUser: User;
  defaultUnitName: string;
  lockedProjectId?: string;
  onSuccess?: (msg: string) => void;
}

export function CreateFundRequestModal({
  isOpen,
  onClose,
  store,
  currentUser,
  defaultUnitName,
  lockedProjectId,
  onSuccess,
}: CreateFundRequestModalProps) {
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState("");
  const [projectId, setProjectId] = useState(lockedProjectId || "");
  const [proposalUrl, setProposalUrl] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setPurpose("");
    setAmount("");
    setProjectId(lockedProjectId || "");
    setProposalUrl("");
  }, [isOpen, lockedProjectId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!purpose.trim() || !num || num <= 0) return;

    const resolvedProjectId = lockedProjectId || projectId || undefined;
    const proj = resolvedProjectId
      ? store.projects.find((p) => p.id === resolvedProjectId)
      : undefined;
    const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

    mutateStore((draft) => {
      draft.fund_requests.unshift({
        id: `fund-${Date.now()}`,
        cabinet_id: activeCab?.id || "cab-arthakarsa-2627",
        project_id: resolvedProjectId,
        submitter_user_id: currentUser.id,
        submitter_name: currentUser.name,
        unit_name: proj ? proj.name : defaultUnitName,
        purpose: purpose.trim(),
        requested_amount: num,
        items: [{ description: purpose.trim(), amount: num }],
        proposal_url: proposalUrl.trim() || "https://docs.google.com/spreadsheets/rab",
        status: "submitted",
        tranches: [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
      addActivityHistory(
        currentUser.name,
        "mengajukan RAB / dana baru",
        `${purpose.trim()} (Rp ${num.toLocaleString("id-ID")})`,
        "Keuangan"
      );
    });

    onSuccess?.(
      `Pengajuan RAB "${purpose.trim()}" (Rp ${num.toLocaleString("id-ID")}) berhasil dikirim ke Bendahara Umum.`
    );
    onClose();
  };

  return (
    <EditorialModal
      isOpen={isOpen}
      onClose={onClose}
      badge="Pengajuan Dana (RAB)"
      title="Ajukan Dana Operasional / Proker"
      subtitle="Pengajuan dana akan diverifikasi dan dicairkan oleh Bendahara Umum beserta bukti transfer."
      maxWidth="md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
          >
            Batal
          </button>
          <button
            type="submit"
            form="shared-fund-req-form"
            className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Pengajuan RAB</span>
          </button>
        </>
      }
    >
      <form id="shared-fund-req-form" onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        <div className="space-y-1">
          <label className="font-semibold text-wine-950">
            Keperluan Dana <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            placeholder="Contoh: Perlengkapan Booth & Konsumsi Business Expo"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Nominal Diajukan (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1000}
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="2500000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 font-mono"
            />
          </div>

          {!lockedProjectId && (
            <div className="space-y-1">
              <label className="font-semibold text-wine-950">Proker Terkait</label>
              <select
                value={projectId}
                onChange={(e) => setProjectId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
              >
                <option value="">Operasional Unit</option>
                {store.projects.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-wine-950">
            URL Rincian RAB / Proposal (Google Sheets / Drive)
          </label>
          <input
            type="url"
            value={proposalUrl}
            onChange={(e) => setProposalUrl(e.target.value)}
            placeholder="https://docs.google.com/spreadsheets/d/..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
          />
        </div>
      </form>
    </EditorialModal>
  );
}

interface RecordTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  store: MockStoreData;
  currentUser: User;
  lockedProjectId?: string;
  sourceAccountLabel?: string;
  onSuccess?: (msg: string) => void;
}

export function RecordTransactionModal({
  isOpen,
  onClose,
  store,
  currentUser,
  lockedProjectId,
  sourceAccountLabel = "Kas Utama BPC HIPMI Telkom",
  onSuccess,
}: RecordTransactionModalProps) {
  const [txType, setTxType] = useState<"income" | "expense">("expense");
  const [txDate, setTxDate] = useState(new Date().toISOString().split("T")[0]);
  const [txCategory, setTxCategory] = useState(EXPENSE_CATEGORIES[0]);
  const [txDesc, setTxDesc] = useState("");
  const [txAmount, setTxAmount] = useState("");
  const [proofFileName, setProofFileName] = useState("");
  const [proofPreviewUrl, setProofPreviewUrl] = useState<string | undefined>(undefined);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    setTxType("expense");
    setTxDate(new Date().toISOString().split("T")[0]);
    setTxCategory(EXPENSE_CATEGORIES[0]);
    setTxDesc("");
    setTxAmount("");
    setProofFileName("");
    setProofPreviewUrl(undefined);
    setErrorMsg("");
  }, [isOpen]);

  const handleTypeChange = (nextType: "income" | "expense") => {
    setTxType(nextType);
    setTxCategory(nextType === "income" ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setProofFileName(file.name);
    setErrorMsg("");

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setProofPreviewUrl(reader.result);
        }
      };
      reader.readAsDataURL(file);
    } else {
      setProofPreviewUrl(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    const num = Number(txAmount);
    if (!txDesc.trim() || !num || num <= 0) {
      setErrorMsg("Mohon isi keterangan dan nominal transaksi yang valid.");
      return;
    }

    // Enforce front_end.md line 5129: Every transaction MUST include proof!
    if (!proofFileName) {
      setErrorMsg(
        "Sesuai aturan analisis sistem, setiap pencatatan transaksi WAJIB melampirkan bukti transaksi (foto struk / bukti transfer / PDF)."
      );
      return;
    }

    const activeCab = store.cabinets.find((c) => c.status === "active") || store.cabinets[0];

    mutateStore((draft) => {
      draft.finance_transactions.unshift({
        id: `tx-${Date.now()}`,
        cabinet_id: activeCab?.id || "cab-arthakarsa-2627",
        project_id: lockedProjectId || undefined,
        date: txDate || new Date().toISOString().split("T")[0],
        type: txType,
        category: txCategory,
        amount: num,
        description: txDesc.trim(),
        source_account: sourceAccountLabel,
        status: "posted",
        proof_file_name: proofFileName,
        proof_preview_url: proofPreviewUrl,
      });

      addActivityHistory(
        currentUser.name,
        `mencatat transaksi ${txType === "income" ? "pemasukan" : "pengeluaran"} + bukti`,
        `${txDesc.trim()} (${proofFileName})`,
        "Keuangan"
      );
    });

    onSuccess?.(
      `Transaksi "${txDesc.trim()}" (Rp ${num.toLocaleString("id-ID")}) beserta bukti (${proofFileName}) berhasil dicatat.`
    );
    onClose();
  };

  const categories = txType === "income" ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;

  return (
    <EditorialModal
      isOpen={isOpen}
      onClose={onClose}
      badge={lockedProjectId ? "Transaksi Buku Proker" : "Catat Buku Kas"}
      title="Catat Transaksi Keuangan"
      subtitle="Sesuai aturan tata kelola keuangan, setiap pencatatan pemasukan maupun pengeluaran wajib disertai bukti transaksi."
      maxWidth="md"
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
          >
            Batal
          </button>
          <button
            type="submit"
            form="shared-record-tx-form"
            className="px-6 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm inline-flex items-center gap-1.5"
          >
            <Banknote className="w-3.5 h-3.5" />
            <span>Simpan Transaksi</span>
          </button>
        </>
      }
    >
      <form id="shared-record-tx-form" onSubmit={handleSubmit} className="space-y-3.5 text-xs">
        {errorMsg && (
          <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{errorMsg}</span>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Jenis Transaksi</label>
            <select
              value={txType}
              onChange={(e) => handleTypeChange(e.target.value as "income" | "expense")}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            >
              <option value="expense">Pengeluaran (-)</option>
              <option value="income">Pemasukan (+)</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Tanggal Transaksi</label>
            <input
              type="date"
              required
              value={txDate}
              onChange={(e) => setTxDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">Kategori</label>
            <select
              value={txCategory}
              onChange={(e) => setTxCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-1">
            <label className="font-semibold text-wine-950">
              Nominal (Rp) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              min={1000}
              required
              value={txAmount}
              onChange={(e) => setTxAmount(e.target.value)}
              placeholder="350000"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950 font-mono"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-semibold text-wine-950">
            Keterangan Transaksi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={txDesc}
            onChange={(e) => setTxDesc(e.target.value)}
            placeholder="Contoh: Pembelian konsumsi rapat koordinasi / Sponsorship PT XYZ"
            className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#E9E1DC] text-sm text-wine-950"
          />
        </div>

        {/* Mandatory Proof Upload Field */}
        <div className="space-y-1.5">
          <label className="font-semibold text-wine-950 block">
            Upload Bukti Transaksi (Struk / Nota / Mutasi) <span className="text-red-500">*</span>
          </label>

          {!proofFileName ? (
            <label className="flex flex-col items-center justify-center gap-2 p-5 rounded-2xl border-2 border-dashed border-[#E8B577]/60 bg-[#FCF8F6] hover:bg-[#FDF7F2] cursor-pointer transition-colors text-center">
              <div className="w-9 h-9 rounded-xl bg-brand-burgundy/10 text-brand-burgundy flex items-center justify-center">
                <Upload className="w-4 h-4" />
              </div>
              <div>
                <span className="font-semibold text-wine-950 block">
                  Klik untuk unggah foto nota atau bukti transfer
                </span>
                <span className="text-[10px] text-neutral-light">
                  Format JPG, PNG, atau PDF (Maks. 5 MB)
                </span>
              </div>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <FileImage className="w-5 h-5 text-emerald-700 shrink-0" />
                <div className="min-w-0">
                  <strong className="text-emerald-950 block truncate">{proofFileName}</strong>
                  <span className="text-[10px] text-emerald-700">Bukti transaksi terlampir</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setProofFileName("");
                  setProofPreviewUrl(undefined);
                }}
                className="p-1.5 rounded-lg text-emerald-800 hover:bg-emerald-100"
                aria-label="Hapus bukti"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </form>
    </EditorialModal>
  );
}

interface FundRequestDetailModalProps {
  request: FundRequest | null;
  onClose: () => void;
  store: MockStoreData;
  currentUser: User;
  isBendum: boolean;
  canConfirmReceipt: boolean;
  onUpdated?: (msg: string) => void;
}

export function FundRequestDetailModal({
  request,
  onClose,
  store,
  currentUser,
  isBendum,
  canConfirmReceipt,
  onUpdated,
}: FundRequestDetailModalProps) {
  const liveRequest = request
    ? store.fund_requests.find((f) => f.id === request.id) || request
    : null;

  const [reviewNote, setReviewNote] = useState("");
  const [transferProofName, setTransferProofName] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!liveRequest) return;
    setReviewNote(liveRequest.reviewer_notes || "");
    setTransferProofName("");
    setErrorMsg("");
  }, [liveRequest?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBendumDecision = (action: "approve" | "disburse" | "revision") => {
    if (!liveRequest) return;
    setErrorMsg("");

    if (action === "disburse" && !transferProofName) {
      setErrorMsg(
        "Wajib mengunggah bukti transfer sebelum mencairkan dana (sesuai aturan analisis sistem FIN-07)."
      );
      return;
    }

    mutateStore((draft) => {
      const target = draft.fund_requests.find((f) => f.id === liveRequest.id);
      if (target) {
        if (action === "approve") {
          target.status = "approved";
          target.approved_amount = target.requested_amount;
          target.reviewer_notes = reviewNote.trim() || "Disetujui oleh Bendahara Umum.";
        } else if (action === "disburse") {
          target.status = "fully_disbursed";
          target.approved_amount = target.approved_amount || target.requested_amount;
          target.tranches.push({
            tranche_number: target.tranches.length + 1,
            amount: target.approved_amount,
            disbursement_status: "transferred",
            proof_file_name: transferProofName,
            transferred_at: new Date().toISOString(),
          });
          draft.finance_transactions.unshift({
            id: `tx-disb-${Date.now()}`,
            cabinet_id: target.cabinet_id,
            project_id: target.project_id,
            date: new Date().toISOString().split("T")[0],
            type: "expense",
            category: "Pencairan RAB Proker/Unit",
            amount: target.approved_amount,
            description: `Pencairan Dana: ${target.purpose} (${target.unit_name})`,
            source_account: "Kas Utama BPC HIPMI Telkom",
            status: "posted",
            reference_id: target.id,
            proof_file_name: transferProofName,
          });
        } else {
          target.status = "revision";
          target.reviewer_notes = reviewNote.trim() || "Mohon perbaiki rincian RAB.";
        }
        target.updated_at = new Date().toISOString();
      }
      addAuditEvent(
        currentUser.id,
        currentUser.name,
        `BENDUM_${action.toUpperCase()}`,
        "FundRequest",
        liveRequest.id
      );
    });

    onUpdated?.(
      action === "disburse"
        ? `Dana dicairkan dengan bukti transfer (${transferProofName}). Menunggu konfirmasi penerimaan oleh unit.`
        : action === "approve"
        ? "Pengajuan RAB disetujui dan siap masuk tahap pencairan."
        : "Catatan revisi RAB dikirim ke pengaju."
    );
    onClose();
  };

  const handleConfirmReceipt = () => {
    if (!liveRequest) return;
    mutateStore((draft) => {
      const target = draft.fund_requests.find((f) => f.id === liveRequest.id);
      if (target) {
        target.status = "settled";
        target.tranches.forEach((tr) => {
          if (tr.disbursement_status === "transferred") {
            tr.disbursement_status = "confirmed";
            tr.confirmed_at = new Date().toISOString();
          }
        });
      }
      addActivityHistory(
        currentUser.name,
        "mengonfirmasi penerimaan pencairan dana",
        liveRequest.purpose,
        "Keuangan"
      );
    });
    onUpdated?.("Penerimaan dana telah dikonfirmasi oleh unit (Status: Settled).");
    onClose();
  };

  return (
    <EditorialModal
      isOpen={!!liveRequest}
      onClose={onClose}
      badge="Rincian Pengajuan Dana (RAB)"
      title={liveRequest?.purpose || "Pengajuan Dana"}
      subtitle={`${liveRequest?.unit_name || "-"} • Pengaju: ${liveRequest?.submitter_name || "-"}`}
      maxWidth="md"
      footer={
        liveRequest && isBendum ? (
          <>
            <button
              type="button"
              onClick={() => handleBendumDecision("revision")}
              className="px-4 py-2 rounded-full border border-rose-200 bg-rose-50 text-rose-700 text-xs font-semibold inline-flex items-center gap-1"
            >
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Revisi</span>
            </button>
            {liveRequest.status !== "approved" &&
              liveRequest.status !== "fully_disbursed" &&
              liveRequest.status !== "settled" && (
                <button
                  type="button"
                  onClick={() => handleBendumDecision("approve")}
                  className="px-4 py-2 rounded-full bg-sky-700 hover:bg-sky-800 text-white text-xs font-semibold"
                >
                  Setujui RAB
                </button>
              )}
            {liveRequest.status !== "fully_disbursed" && liveRequest.status !== "settled" && (
              <button
                type="button"
                onClick={() => handleBendumDecision("disburse")}
                className="px-5 py-2 rounded-full bg-brand-burgundy hover:bg-brand-darkWine text-white text-xs font-semibold shadow-sm"
              >
                Cairkan Dana + Bukti
              </button>
            )}
          </>
        ) : liveRequest && canConfirmReceipt && liveRequest.status === "fully_disbursed" ? (
          <>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full border border-[#E9E1DC] bg-white text-xs font-semibold text-wine-950"
            >
              Tutup
            </button>
            <button
              type="button"
              onClick={handleConfirmReceipt}
              className="px-5 py-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Konfirmasi Dana Diterima</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-brand-burgundy text-white text-xs font-semibold"
          >
            Tutup
          </button>
        )
      }
    >
      {liveRequest && (
        <div className="space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">Nominal</span>
              <strong className="font-mono text-base text-brand-burgundy">
                Rp {liveRequest.requested_amount.toLocaleString("id-ID")}
              </strong>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#FCF8F6] border border-[#E9E1DC]">
              <span className="text-[10px] font-mono uppercase text-neutral-light block">Status</span>
              <strong className="text-wine-950">
                {FUND_STATUS_LABELS[liveRequest.status] || liveRequest.status}
              </strong>
            </div>
          </div>

          {/* Disbursement Proof History */}
          {liveRequest.tranches.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-1.5">
              <strong className="text-emerald-950 block">Riwayat Transfer Pencairan</strong>
              {liveRequest.tranches.map((tr) => (
                <div key={tr.tranche_number} className="flex items-center justify-between text-[11px]">
                  <span className="text-emerald-900">
                    Termin #{tr.tranche_number} • Rp {tr.amount.toLocaleString("id-ID")}
                    {tr.proof_file_name ? ` (${tr.proof_file_name})` : ""}
                  </span>
                  <span className="font-mono font-bold uppercase text-emerald-700">
                    {tr.disbursement_status}
                  </span>
                </div>
              ))}
            </div>
          )}

          {isBendum && liveRequest.status !== "fully_disbursed" && liveRequest.status !== "settled" && (
            <div className="space-y-3 pt-2 border-t border-[#E9E1DC]">
              <div className="space-y-1.5">
                <label className="font-semibold text-wine-950 block">
                  Upload Bukti Transfer Pencairan (Wajib jika Mencairkan)
                </label>
                {!transferProofName ? (
                  <label className="flex items-center justify-center gap-2 p-3.5 rounded-2xl border-2 border-dashed border-[#E8B577]/60 bg-[#FCF8F6] hover:bg-[#FDF7F2] cursor-pointer text-wine-950 font-semibold">
                    <Upload className="w-4 h-4 text-brand-burgundy" />
                    <span>Pilih File Bukti Transfer (JPG / PNG / PDF)</span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) {
                          setTransferProofName(f.name);
                          setErrorMsg("");
                        }
                      }}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between gap-2">
                    <span className="text-emerald-900 font-medium truncate">
                      📎 {transferProofName}
                    </span>
                    <button
                      type="button"
                      onClick={() => setTransferProofName("")}
                      className="text-emerald-700 hover:text-rose-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-wine-950 block">Catatan Bendahara Umum</label>
                <textarea
                  rows={2}
                  value={reviewNote}
                  onChange={(e) => setReviewNote(e.target.value)}
                  placeholder="Catatan review RAB atau keterangan transfer..."
                  className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E9E1DC] text-xs text-wine-950 resize-none"
                />
              </div>
            </div>
          )}
        </div>
      )}
    </EditorialModal>
  );
}
