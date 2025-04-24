
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { RefreshCcw } from "lucide-react"

interface SaveListModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: () => void
}

export function SaveListModal({ isOpen, onClose, onSave }: SaveListModalProps) {
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = () => {
    setIsSaving(true)
    onSave()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Save list view</DialogTitle>
          <DialogDescription className="text-gray-600">
            The list will be saved for everyone in the project. They'll see the applied filters, grouping, fields, and columns.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-3 mt-6">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSaving}
          >
            {isSaving ? (
              <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
            ) : null}
            Save
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
