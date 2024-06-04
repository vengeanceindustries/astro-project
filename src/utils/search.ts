export function objectToParams(obj: Record<string, any>) {
	return new URLSearchParams(obj).toString();
}
