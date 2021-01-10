var moment = require("moment"); // require

module.exports = (res) => {
  const createdAt = moment();
  let formatedDate = createdAt.format("L");
  console.log(res);
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style> 
    h1 {
        
        font-size: 20px;
    }
    
    </style>
</head>
<body>
<img src=${res.selectedFile} alt="" />
    <h1>Date:   ${`${formatedDate}`}
   <h1> Name:   ${res.name} </h1><br />
   <h1> Due Date:   ${res.dueDate} </h1><br />
   <h1> Description:    ${res.description} </h1><br />
   <h1>Rate:    ${res.rate} </h1><br />
   <h1> Hours:  ${res.hours} </h1><br />
   <h1> Total:  ${res.total} </h1><br />
   





</body>
</html>`;
};
