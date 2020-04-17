import { BuefyNamespace } from 'buefy';

declare module 'vue/types/vue' {
	interface Vue {
		$buefy: BuefyNamespace
	}
}
