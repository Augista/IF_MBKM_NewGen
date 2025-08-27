import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { useState } from "react"
import { useBookJadwalMutation } from "@/hooks/useBookJadwalMutation"

export function BookModal({ open, onClose, jadwalId, waktuList, mbkmId }: any) {
  const [selectedWaktu, setSelectedWaktu] = useState<string | null>(null)
  const book = useBookJadwalMutation(jadwalId)

  const handleSubmit = () => {
    if (!selectedWaktu) return
    book.mutate(
      { waktuDipilih: selectedWaktu, mbkmId },
      {
        onSuccess: () => {
          setSelectedWaktu(null) 
          onClose() 
        },
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-4">
        <DialogTitle className="text-lg font-semibold mb-2">Pilih Waktu Booking</DialogTitle>
        <div className="grid gap-2 mb-4">
          {waktuList.map((w: string) => (
            <button
              key={w}
              className={`px-4 py-2 border rounded ${
                selectedWaktu === w ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
              onClick={() => setSelectedWaktu(w)}
            >
              {w}
            </button>
          ))}
        </div>

        {selectedWaktu && (
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-300 text-white py-2 rounded hover:bg-blue-400 transition"
          >
            Book Waktu: {selectedWaktu}
          </button>
        )}
      </DialogContent>
    </Dialog>
  )
}
