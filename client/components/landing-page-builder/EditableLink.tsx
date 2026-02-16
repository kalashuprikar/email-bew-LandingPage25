import React, { useState } from "react";
import { Input } from "@/components/ui/input";

interface EditableLinkProps {
  label: string;
  href: string;
  onUpdate?: (label: string, href: string) => void;
  onDelete?: () => void;
  inline?: boolean;
  isSelected?: boolean;
}

export const EditableLink: React.FC<EditableLinkProps> = ({
  label,
  href,
  onUpdate,
  inline = true,
  isSelected = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editLabel, setEditLabel] = useState(label);
  const [editHref, setEditHref] = useState(href);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(editLabel, editHref);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditLabel(label);
    setEditHref(href);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 border border-valasys-orange rounded-full bg-white z-50">
        <Input
          placeholder="Text"
          value={editLabel}
          onChange={(e) => setEditLabel(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') handleCancel();
          }}
          size="sm"
          className="text-xs h-6 border-0 focus:ring-0 px-0"
          autoFocus
        />
      </div>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        setIsEditing(true);
      }}
      className={`cursor-pointer hover:opacity-70 transition-all ${
        isSelected ? "font-semibold text-valasys-orange" : ""
      }`}
      title="Click to edit"
    >
      {inline ? <span>{label}</span> : <a href={href}>{label}</a>}
    </div>
  );
};
