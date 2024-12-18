/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2023 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import { NavContextMenuPatchCallback } from "@api/ContextMenu";
import { Devs } from "@utils/constants";
import { insertTextIntoChatInputBox } from "@utils/discord";
import definePlugin from "@utils/types";
import { Menu } from "@webpack/common";
import type { Message, User } from "discord-types/general";

const MessageContextMenuPatch: NavContextMenuPatchCallback = (
    children,
    { message }: { message: Message },
): void => {
    if (!message || !message.author) return;
    if (
        message.author.id !== "1025590776861819012" ||
        message.author.bot !== true
    ) {
        return;
    }

    if (
        (message.components.length === 4 || message.components.length === 2) ===
        false
    )
        return;
    const buttons = [];
    message.components.forEach((stupid) => {
        stupid.components.forEach((dumb) => {
            buttons.push(dumb);
        });
    });

    const found = buttons.find(
        (button) => button.customId.split(",")[1] === "y",
    );
    if (!found) return;
    children.push(
        <Menu.MenuItem
            label="Boar Solve"
            key="boar-hack-solve"
            id="boar-hack-solve"
            action={() => insertTextIntoChatInputBox(found.id)}
        />,
    );
};

export default definePlugin({
    name: "BoarHack",
    authors: [Devs.Kathund],
    description: "Hack boar.",
    dependencies: ["UserSettingsAPI"],
    contextMenus: {
        message: MessageContextMenuPatch,
    },
});
