export const buildQueryString = (baseUrl: string, params: Record<string, any>) => {
	const queryString = Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&')

	return `${baseUrl}?${queryString}`
}

export const buildQueryStringWithAuth = (
	baseUrl: string,
	params: Record<string, any>,
	auth: string
) => {
	const queryString = Object.entries(params)
		.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
		.join('&')

	return `${baseUrl}?${queryString}&auth=${auth}`
}
