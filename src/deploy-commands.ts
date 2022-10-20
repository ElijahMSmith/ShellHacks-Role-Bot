import { SlashCommandBuilder } from "@discordjs/builders"
import { Routes } from "discord-api-types/v9"
import { REST } from "@discordjs/rest"
import path from "path"
import dotenv from "dotenv"

dotenv.config({ path: path.resolve(__dirname, "../../.env") })

const commands = [
	new SlashCommandBuilder()
		.setName("shellhacks-hacker")
		.setDescription("Add the ShellHacks Hacker role to yourself"),
	new SlashCommandBuilder()
		.setName("hackgt-hacker")
		.setDescription("Add the HackGT Hacker role to yourself"),
].map((command) => command.toJSON())

const rest = new REST({ version: "9" }).setToken(process.env.TOKEN)

const reloadCommands = async () => {
	try {
		await rest.put(
			Routes.applicationGuildCommands(
				process.env.CLIENT_ID,
				process.env.GUILD_ID
			),
			{
				body: commands,
			}
		)

		console.log("Successfully registered application commands.")
	} catch (error) {
		console.error(error)
	}
}

reloadCommands()
