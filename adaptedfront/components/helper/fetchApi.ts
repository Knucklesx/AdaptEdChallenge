import axios from "axios";

export interface ApiResponse<T> {
	data: T[];
}

export const fetchApi = async <T>(
	session: any,
	endpoint: string
): Promise<ApiResponse<T>> => {
	let data: T[] = [];

	console.log("s", session);

	const response = await axios.get(`http://localhost:3001/${endpoint}`, {
		headers: {
			Authorization: `Bearer ${session!.access_token}`,
		},
	});

	console.log("response", response);

	data = response.data || [];
	console.log("response", typeof data);
	console.log("data", data);

	return { data };
};
