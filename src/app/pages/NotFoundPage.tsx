import React from "react";
import { SEO } from "@/infra/SEO";

const NotFoundPage = () => {
    return (
        <>
            <SEO title="404 — Page Not Found" />
            <div className="flex items-center justify-center h-screen w-screen bg-[#0a0a0a]">
                <div className="bg-black/60 backdrop-blur-xl border border-white/12 rounded-2xl px-20 py-16 text-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] shadow-white/5">
                    <h1 className="text-[96px] font-extrabold text-white leading-none m-0">
                        404
                    </h1>
                    <p className="text-lg text-white/50 mt-4 tracking-widest uppercase m-0">
                        Page Not Found
                    </p>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;
