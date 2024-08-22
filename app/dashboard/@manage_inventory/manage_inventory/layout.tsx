import React from "react";

export default function ManageInventoryLayout({
    children, modal_add_new_machine
}: {
    children: React.ReactNode,
    modal_add_new_machine: React.ReactNode
}) {
    return (
        <div>
            {children}
            {modal_add_new_machine}
        </div>
    );
}