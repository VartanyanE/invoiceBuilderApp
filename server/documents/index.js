var moment = require("moment"); // require

module.exports = (res) => {
  const createdAt = moment();
  let formatedDate = createdAt.format("L");
  const currentDate = moment().add(30, "days");
  let thirtyDays = currentDate.format("L");
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
			body {
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				text-align: center;
				color: #777;
			}

			body h1 {
				font-weight: 300;
				margin-bottom: 0px;
				padding-bottom: 0px;
				color: #000;
			}

			body h3 {
				font-weight: 300;
				margin-top: 10px;
				margin-bottom: 20px;
				font-style: italic;
				color: #555;
			}

			body a {
				color: #06f;
			}

			.invoice-box {
				max-width: 800px;
				margin: auto;
				padding: 30px;
				border: 1px solid #eee;
				box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
				font-size: 16px;
				line-height: 24px;
				font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
				color: #555;
			}

			.invoice-box table {
				width: 100%;
				line-height: inherit;
				text-align: left;
				border-collapse: collapse;
			}

			.invoice-box table td {
				padding: 5px;
				vertical-align: top;
			}

			.invoice-box table tr td:nth-child(2) {
				text-align: right;
			}

			.invoice-box table tr.top table td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.top table td.title {
				font-size: 45px;
				line-height: 45px;
				color: #333;
			}

			.invoice-box table tr.information table td {
				padding-bottom: 40px;
			}

			.invoice-box table tr.heading td {
				background: #eee;
				border-bottom: 1px solid #ddd;
				font-weight: bold;
			}

			.invoice-box table tr.details td {
				padding-bottom: 20px;
			}

			.invoice-box table tr.item td {
				border-bottom: 1px solid #eee;
			}

			.invoice-box table tr.item.last td {
				border-bottom: none;
			}

			.invoice-box table tr.total td:nth-child(2) {
				border-top: 2px solid #eee;
				font-weight: bold;
			}

			@media only screen and (max-width: 600px) {
				.invoice-box table tr.top table td {
					width: 100%;
					display: block;
					text-align: center;
				}

				.invoice-box table tr.information table td {
					width: 100%;
					display: block;
					text-align: center;
				}
			}
		</style>
</head>
 
   
<body>
		

		<div class="invoice-box">
			<table>
				<tr class="top">
					<td colspan="2">
						<table>
							<tr>
								<td class="title">
                                 <img src=${res.selectedFile} alt="Company logo" style="width: 100%; max-width: 200px"/>

								</td>

								<td>
									Invoice #: ${res.invoiceNumber}<br />
									Created: ${formatedDate}<br />
									Due: ${thirtyDays}
								</td>
							</tr>
						</table>
					</td>
				</tr>

				<tr class="information">
					<td colspan="2">
						<table>
							<tr>
								<td>
									${res.name} <br />
									${res.address} <br />
									${res.address2}
								</td>

								<td>
								${res.clientName} <br />
								${res.clientAddress} 

								</td>
							</tr>
						</table>
					</td>
				</tr>

				

				<tr class="heading">
					<td>Item</td>

					<td>Price</td>
				</tr>

				<tr class="item">
					<td>${res.description}</td>

					<td>$ ${res.preTax}</td>
				</tr>

				

				<tr class="item last">
					<td></td>

					<td>tax: ${res.tax}%</td>
				</tr>

				<tr class="total">
					<td></td>
					<tr class="heading">
					<td></td>

					<td>Total</td>
				</tr>
					<td> </td>
					<td> ${res.total}</td>
				</tr>
			</table>
		</div>
	</body>




 </body>
</html>`;
};
// <body>
// <img src=${res.selectedFile} alt="" />
//     <h1>Date:   ${`${formatedDate}`}
//     <h1> Invoice #:   ${res.invoiceNumber} </h1><br />
//    <h1> Name:   ${res.name} </h1><br />
//    <h1> Due Date:   ${thirtyDays} </h1><br />
//    <h1> Description:    ${res.description} </h1><br />
//    <h1>Rate:    ${res.rate} </h1><br />
//    <h1> Hours:  ${res.hours} </h1><br />
//    <h1> Tax:  ${res.tax}% </h1><br />
//   <h1> Total:  ${res.total} </h1><br />