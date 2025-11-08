"use client";
import { Button } from "@/components/ui/button";

export default function CopyPayLink({ id }: { id: string }) {
  async function copy() {
    const url = `${location.origin}/pay/${id}`;
    await navigator.clipboard.writeText(url);
    alert("Link copiado: " + url);
  }
  return (
    <Button size="sm" variant="secondary" onClick={copy}>
      Copiar link
    </Button>
  );
}
