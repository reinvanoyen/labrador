const fs = {
	async blobUrlToArrayBuffer(blobUrl) {
		const response = await fetch(blobUrl);
		const blob = await response.blob();
		return blob.arrayBuffer(); // or new Uint8Array(await blob.arrayBuffer()) if Uint8Array is needed
	},
	save(data, filename, type) {
		var file = new Blob([data], {type: type});
		if (window.navigator.msSaveOrOpenBlob) // IE10+
			window.navigator.msSaveOrOpenBlob(file, filename);
		else { // Others
			var a = document.createElement("a"),
				url = URL.createObjectURL(file);
			a.href = url;
			a.download = filename;
			document.body.appendChild(a);
			a.click();
			setTimeout(function() {
				document.body.removeChild(a);
				window.URL.revokeObjectURL(url);
			}, 0);
		}
	}
};

export default fs;