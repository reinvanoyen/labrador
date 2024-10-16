const fs = {
	async blobUrlToArrayBuffer(blobUrl) {
		const response = await fetch(blobUrl);
		const blob = await response.blob();
		return blob.arrayBuffer(); // or new Uint8Array(await blob.arrayBuffer()) if Uint8Array is needed
	}
};

export default fs;