import { PexelSrc } from "./pexel-src.model";

export interface PexelPhoto {
	id: number;

	url: string;
	height: number;
	width: number;
	avg_color: string;
	liked: boolean;
	photographer: string;
	photographer_url: string;
	src: PexelSrc;
}