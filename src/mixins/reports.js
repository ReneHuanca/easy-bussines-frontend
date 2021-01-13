
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const reports = {
    data() {
        return {
            date: ''
        }
    },

    computed: {
        now() {
            const date = new Date()
            return `${date.getFullYear()}_${date.getMonth()+1}_${date.getDate()}-${date.getHours()}${date.getMinutes()}${date.getSeconds()}`
        }
    },

    methods: {
        exportTableToPDF(tableId, filename = 'report', title = 'report') {
            filename = filename+'-'+this.now;

            let aux = [];
			let cont = 0;
			this.customers.forEach(object => {
				aux[cont] = Object.values(object);
				cont++;
			});

			var doc = new jsPDF('landscape')
			var totalPagesExp = '{total_pages_count_string}'
			const base64Img ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAb1BMVEX///8AAAB2dna2tragoKCZmZmEhISSkpKlpaWJiYlzc3Nra2v39/fs7OyBgYHp6eloaGheXl7Pz89kZGQiIiI1NTU8PDywsLDX19fIyMgZGRkdHR2UlJQKCgrAwMDx8fEpKSlJSUlUVFRYWFhERERsA5NPAAAFeklEQVR4nO2dDXLaMBBGbcBxICa0NCEFEpM0vf8ZC+10mloiklafdteefQew/EaytdLqp6oiWPcLPmJeCMum2dWcfGH265asehfuWAW3R3ZB3lp8EvA7841NcC4jyNdQt1KCXIrdg5whT0O9ERRk+d2sRQU5GmorbFi+FqUF6/prWcHv0n516VoU6ws/UvRb5I9HfZTsNFbScn8oqDj7rNz32bLBsPgRUCzXUK8b3u07YDnBr6GY4jXD1QlbTjhyKtVp+A0Pe3Q5EbFhoU7Da7gDV2AVF/2Waag+w12BcqLi+yK16DE8IP8wf4kbwZT4Fj2G2wLFxI7RCjRU13CGL6SKH4XiFV3DNbyMC9HjbHh04xiWqcKEmQS0omNY5CtMmisBN9Sh4bHEj7RKmw3CKg4N36BP/0fSfBe00xga3iMf/oG0GT1k1z80bIDP/kjinCWwoQ4N57hH/0fqrCyuFrUa4joNtYawhqrXEKWo2BDUUDUbYn43qg0hDVW3IaIWlRsCAjjthvm1qN4w+1vUb5hbiyMwzOwXx2CY11BHYZilOA7DnIY6EsOM381YDOkNdTSG5FocjyE1gBuRIbGhjsmQpjgqQ1KnMS5DiuLIDOtlcslchs8gw1VyyVyGtyDD9PQmlyFqladew/XL1A2r0NK98RuCluoqNqwOkzfEbK7SbFi9Td5wg/idqjaE9Im6DRGKyg2rU3avqN3w/EfN3Auo37Dq5u8TN7ywfbqNZbjjZSSGCQyDPTN0MUNpzDCMGUrDZNjNn9tYmh66UpzFMPlklxZg9hcOw81jomBd/8RVI4chJVTG7X5jMPx0o/BVniF6FYfhhiRY1xg/DkPqNGePEWQwvCca3mIEGQzvJm84/TrsiYbj+Q6pRxBh/Fj6Q1ozhW0Q0xrT/ETI/YbDsJt8XFpVy7SUyhG5h5FpfHjaP9/E0kAPfbExfgRmKI0ZhjFDacwwjBlKY4ZhzFAaMwxjhtJwGfbR61/o+GfnePKHXAdit56xM4fhOn2ehsqjexqe1rk2Kg8ShtRpfRrOUWN657ypDNup3vwhlVD5enJPVIbNVG/+kMpwI6zVYb7h9L/D6f9Lma+huRkWzxHTcF7ndXRKZ4lL+cK2B5m4lO+WD99OdK78Yd8uS9P23sP8bYwfxgylMcMwZiiNGYYxQ2nMMIwZSmOGYcxQGrb84SJ6/yGVhWD+EHbWWgjfdjDLHyIMX7n8zrxKGE5+vnT6c97Tz1tMP/dk+UM0lj/Us5ebyobdcPrraXjzhyJroqo1X9j2KpQ/TD7bhMpSaG3ixbFvV6Vp/efa2Bg/jBlKY4ZhzFAaMwxjhtKYYRgzlMYMw5ihNFzjw/0i+nwaKgv/uTZM+UPQLTgBXnxnEyk9J4rKo1uNlj8EGPLmD53F7JY/zDecft6Ct5G6aW7LH+YbWv4QjeUP1ZznTcUR4IhpMHfexXFwSmc5V58xfzhso5Y/BBle7rdo70vTzpnGh8jzYxE0cENnMYQww4gj3/CtwFvm8AY3PEJPAc6mG651yTestwXek852+HoAw/RHlATwem5Q5q7akcOdYUAYaqpExNt5Ams9X6LzFYIMD1p+p50n6IcYAm9rymPneTeMYb3zHlHBzMkniDKsD/sCr5zG3j8uRRnW9Uq2Gk/DO2TxhnV9h73GIYFuf30OE2l45n22bLhZzj69ETnd8Fpr0Moq2ZBrhgKF76Slz+Ge8c0lfZ0B4Mp6Vr4nG1bSr5zGS7pgxXUMMgbKJa7cSd48SINX7hxoDs424Sg6zsOe83ggRlmecaZSyGPzsfSJGWvunqTfPYonuuC5oXJuMqRxzJw+YsugUfFl3hLZNN5ZAxXsGjd1SmLdLzTSR3XzvwBPz4dLy5iqHwAAAABJRU5ErkJggg=='
      
            doc.autoTable({ html: tableId,
                didDrawPage: function (data) {
                    // Header
                    doc.setFontSize(20)
                    doc.setTextColor(40)
                    doc.setFontStyle('normal')
                    if (base64Img) {
                        doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
                    }
                    doc.text(title, data.settings.margin.left + 15, 22)

                    // doc.setFontSize(14);
                    // doc.text(20, 30, 'Msoquito USB.');
                    
                    // Footer
                    var str = 'Page ' + doc.internal.getNumberOfPages()
                    // Total page number plugin only available in jspdf v1.0+
                    if (typeof doc.putTotalPages === 'function') {
                    str = str + ' of ' + totalPagesExp
                    }
                    doc.setFontSize(10)

                    // jsPDF 1.4+ uses getWidth, <1.4 uses .width
                    var pageSize = doc.internal.pageSize
                    var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
                    doc.text(str, data.settings.margin.left, pageHeight - 10)
                },
                margin: { top: 30 },
            })
      
            // // TABLE WITH JS
            // doc.autoTable({
			// 	head: [['Nombre', 'Correo', 'Telefono', 'Empresa', 'Pais', 'Ciudad']],
			// 	body: aux,
			// 	didDrawPage: function (data) {
			// 		// Header
			// 		doc.setFontSize(20)
			// 		doc.setTextColor(40)
			// 		doc.setFontStyle('normal')
			// 		if (base64Img) {
			// 			doc.addImage(base64Img, 'JPEG', data.settings.margin.left, 15, 10, 10)
			// 		}
			// 		doc.text('Reporte Clientes', data.settings.margin.left + 15, 22)

			// 		// Footer
			// 		var str = 'Page ' + doc.internal.getNumberOfPages()
			// 		// Total page number plugin only available in jspdf v1.0+
			// 		if (typeof doc.putTotalPages === 'function') {
			// 			str = str + ' of ' + totalPagesExp
			// 		}
			// 		doc.setFontSize(10)

			// 		// jsPDF 1.4+ uses getWidth, <1.4 uses .width
			// 		var pageSize = doc.internal.pageSize
			// 		var pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight()
			// 		doc.text(str, data.settings.margin.left, pageHeight - 10)
			// 	},
			// 	margin: { top: 30 },
			// })

			// // Total page number plugin only available in jspdf v1.0+
			// if (typeof doc.putTotalPages === 'function') {
			// 	doc.putTotalPages(totalPagesExp)
			// }
			doc.save(filename + '.pdf');
        },
        exportTableToExcel(tableId, filename = 'report') {
            let downloadLink;
            const dataType = 'application/msexcel';
            const tableSelect = document.querySelector(tableId);
            const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
            
            // Specify file name
            filename = filename +'-'+ this.now +'.xls';
            
            // Create download link element
            downloadLink = document.createElement("a");
            
            document.body.appendChild(downloadLink);
            
            if(navigator.msSaveOrOpenBlob){
                const blob = new Blob(['\ufeff', tableHTML], {
                    type: dataType
                });
                navigator.msSaveOrOpenBlob( blob, filename);
            } else {
                // Create a link to the file
                downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
            
                // Setting the file name
                downloadLink.download = filename;
                
                //triggering the function
                downloadLink.click();
            }
        },

        exportTableToWord(elementId, filename = 'report') {
            if (!window.Blob) {
                alert('Your legacy browser does not support this action.');
                return;
            }
      
            let html, link, blob, url, css;
            
            // EU A4 use: size: 841.95pt 595.35pt;
            // US Letter use: size:11.0in 8.5in;
            
            css = (
                '<style>' +
                '@page v-data-table__wrapper{size: 841.95pt 595.35pt;mso-page-orientation: landscape;}' +
                'div.v-data-table__wrapper {page: v-data-table__wrapper;}' +
                'table{width: 100%;border-collapse:collapse;}td,th{border:1px gray solid;width:5em;padding:2px;}'+
                '</style>'
            );
            
            // removes header and footer of table
            let el = document.querySelector(elementId).cloneNode(true)
            el.removeChild(el.firstChild)
            el.removeChild(el.lastChild)

            html = el.innerHTML;

            blob = new Blob(['\ufeff', css + html], {
                type: 'application/msword'
            });

            url = URL.createObjectURL(blob);
            link = document.createElement('A');
            link.href = url;

            // Set default file name. 
            // Word will append file extension - do not add an extension here.
            link.download = filename+'-'+this.now;   
            document.body.appendChild(link);
            if (navigator.msSaveOrOpenBlob) {
                navigator.msSaveOrOpenBlob( blob, `${filename}.doc`); // IE10-11
            } else {
                link.click(); // other browsers 
            }

            document.body.removeChild(link);
        }
    },
}

export default reports