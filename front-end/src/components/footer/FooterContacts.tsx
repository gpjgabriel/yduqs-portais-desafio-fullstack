"use client";

export const FooterContacts = () => {
  return (
    <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
      <a
        href="https://wa.me/..."
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3BCE57]">
          <i
            className="pi pi-whatsapp text-white"
            style={{ fontSize: "1.25rem" }}
          ></i>
        </div>
        <span className="font-semibold">Precisa de ajuda?</span>
      </a>
      <a
        href="tel:08007715055"
        className="flex items-center gap-3 transition-opacity hover:opacity-80"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
          <i
            className="pi pi-phone text-blue-900"
            style={{ fontSize: "1.25rem" }}
          ></i>
        </div>
        <span className="font-semibold">0800 771 5055</span>
      </a>
    </div>
  );
};
