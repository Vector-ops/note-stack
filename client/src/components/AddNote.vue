<template>
	<div class="new-note">
		<div class="headline">
			<div class="date">{{ this.date }}</div>
			<div class="buttons">
				<ph-trash
					v-if="show"
					:size="32"
					weight="duotone"
					class="btn"
					@click="$emit('delete-click', this.note._id)"
				/>
				<ph-x :size="32" class="btn" v-on:click="clearForm" />
				<ph-floppy-disk
					:size="32"
					class="btn"
					weight="duotone"
					v-on:click="updateNote"
				/>
			</div>
		</div>
		<div class="line"></div>
		<form v-on:submit.prevent="submitForm">
			<input type="text" v-model="title" :placeholder="'Title'" />

			<textarea
				rows="30"
				cols="45vw"
				type="text"
				v-model="body"
				:placeholder="'Body'"
			/>
		</form>
	</div>
</template>

<script>
import { ref } from "vue";
export default {
	name: "AddNote",
	props: {
		note: Object,
		show: {
			type: Boolean,
			default: false,
		},
	},
	emits: ["update-note", "close-form", "delete-click"],
	setup() {
		const title = ref("");
		const body = ref("");

		const date = ref("");
		return { title, body, date };
	},
	created() {
		this.$watch(
			() => this.note,
			() => {
				this.setNote();
			},
			{ immediate: true }
		);
	},
	methods: {
		submitForm() {
			console.log(this.title, this.body);
		},
		clearForm() {
			this.title = "";
			this.body = "";
			this.$emit("close-form");
		},
		setNote() {
			if (this.note) {
				const rawDate = new Date(this.note.created_at);
				this.date = rawDate.toDateString();
				this.title = this.note.title;
				this.body = this.note.body;
			} else {
				this.date = Date().split("GMT")[0];
			}
		},
		updateNote() {
			let updatedNote = {
				title: this.title,
				body: this.body,
			};
			this.$emit("update-note", updatedNote);
		},
	},
};
</script>

<style scoped>
.date {
	font-weight: bolder;
	font-size: large;
}

.headline {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 0 1em 0 0.5em;
}
.new-note {
	display: flex;
	flex-direction: column;
	justify-content: start;
	align-items: start;
	gap: 0.5em;
	padding: 0.5em 0 0.5em 0;
	width: 100%;
	height: 100%;
}

form {
	display: flex;
	flex-direction: column;
	gap: 1em;
	width: 100%;
}

input {
	height: 3em;
	width: 100%;
	border: none;
	border-bottom: 1px solid gray;

	padding-left: 0.7em;
	padding-top: 1em;
	font-size: large;
	background-color: lightgray;
	font-weight: bold;
}

input:focus,
textarea:focus {
	outline: none;
}

textarea {
	resize: none;
	border: none;
	border-radius: 7px;
	padding-left: 0.7em;
	padding-top: 0.3em;
	font-size: x-large;
	background-color: lightgray;
	font-weight: 500;
}

.line {
	width: 100%;
	border-bottom: 2px solid gray;
}

.buttons {
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1em;
}

.btn {
	cursor: pointer;
}
</style>
