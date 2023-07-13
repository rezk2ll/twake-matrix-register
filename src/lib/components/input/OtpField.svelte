<script lang="ts">
	export let value: undefined | string;
	export let input: HTMLInputElement;
	export let onChange: () => void;

	function validator(_node: HTMLInputElement, _val: string | undefined) {
		return {
			update(val: string | undefined) {
				if (!val) return;

				if (/^\d$/.test(val as string)) {
					value = val;
					onChange();
					return;
				}

				value = undefined;
			}
		};
	}
</script>

<input
	use:validator={value}
	required
	bind:value
	bind:this={input}
	type="text"
	maxlength="1"
	class="w-10 outline-none p-3 text-center rounded-md m-1 border-solid border-2 border-blue-800 font-bold text-white transition-all bg-gray-900"
/>
