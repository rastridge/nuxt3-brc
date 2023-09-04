<template>
	<div id="settings">
		<button class="p-link layout-topbar-button" @click="toggle">
			<i class="pi pi-cog" />
			<span>Settings</span>
		</button>

		<client-only>
			<OverlayPanel
				id="overlay_panel"
				ref="op"
				append-to="body"
				dismissable
				style="width: 200px"
			>
				<div class="field-radiobutton">
					<RadioButton
						id="saga"
						v-model="themeStore.themeName"
						name="layoutColorMode"
						value="saga"
						@change="themeStore.setLight()"
					/>
					<label>Light</label>
				</div>
				<div class="field-radiobutton">
					<RadioButton
						id="vela"
						v-model="themeStore.themeName"
						name="layoutColorMode"
						value="vela"
						@change="themeStore.setDim()"
					/>
					<label>Dim</label>
				</div>
				<div class="field-radiobutton">
					<RadioButton
						id="arya"
						v-model="themeStore.themeName"
						name="layoutColorMode"
						value="arya"
						@change="themeStore.setDark()"
					/>
					<label>Dark</label>
				</div>

				<h6>Primary Color</h6>
				<div class="flex">
					<div
						style="width: 2rem; height: 2rem; border-radius: 6px"
						class="bg-blue-500 mr-3 cursor-pointer"
						@click="themeStore.setColor('blue')"
					/>
					<div
						style="width: 2rem; height: 2rem; border-radius: 6px"
						class="bg-green-500 mr-3 cursor-pointer"
						@click="themeStore.setColor('green')"
					/>
					<div
						style="width: 2rem; height: 2rem; border-radius: 6px"
						class="bg-yellow-300 mr-3 cursor-pointer"
						@click="themeStore.setColor('orange')"
					/>
					<div
						style="width: 2rem; height: 2rem; border-radius: 6px"
						class="bg-purple-500 cursor-pointer"
						@click="themeStore.setColor('purple')"
					/>
				</div>
			</OverlayPanel>
		</client-only>
	</div>
</template>

<script setup>
	import { useThemeStore } from '@/stores'
	const themeStore = useThemeStore()
	const op = ref(null)

	function toggle(event) {
		op.value.toggle(event)
	}
</script>
