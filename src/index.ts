import {
	ApplicationCommand,
	Client,
	Guild,
	Intents,
	SelectMenuInteraction,
	GuildMember,
	Role,
} from "discord.js"
import dotenv from "dotenv"

dotenv.config()

console.log()

const axios = require("axios").default
const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

// --------- Main execution ---------

client.once("ready", async () => {
	console.log("ShellHacks Role bot online.")
})

client.on("interactionCreate", async (interaction) => {
	if (!interaction.isCommand()) return
	const commandName = interaction.commandName
	const member = interaction.member

	if (commandName === "shellhacks-hacker") {
		const member = interaction.guild.members.cache.get(interaction.user.id)

		// Get role with ID
		const roleToGive = await interaction.guild.roles.fetch(
			process.env.ROLE_ID
		)

		// Add role to member
		member.roles
			.add(roleToGive)
			.then(() => interaction.reply("Role added!"))
			.catch((err) => {
				console.log(err)
				interaction.reply("Failed to add role.")
			})
	}
})

client.login(process.env.TOKEN)
