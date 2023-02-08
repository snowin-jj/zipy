export const capitalize = (name: string) => {
	if (name) return name.replace(/\b(\w)/g, (s) => s.toUpperCase());
};
