module.exports = ({ name, dueDate, description, rate, hours }) => {
  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
   <h1> ${name} </h1><br />
   <h1> ${dueDate} </h1><br />
   <h1> ${description} </h1><br />
   <h1> ${rate} </h1><br />
   <h1> ${hours} </h1><br />




</body>
</html>`;
};
