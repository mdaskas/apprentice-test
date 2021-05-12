import { PexelPhoto } from "./pexel-photo.model";

export interface PexelResponse {
	page: number;
	per_page: number;
	next_page?: string;
	prev_page?: string;
	photos: PexelPhoto[];
}