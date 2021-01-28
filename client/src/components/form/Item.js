import React from "react";
import { TextField, Grid } from "@material-ui/core";
function Item() {
  return (
    <div>
      <Grid item xs={3}>
        <h5>Worked!</h5>
        {/* <TextField
              className={classes.textField}
              id="itemName"
              label="Item Name"
              variant="outlined"
              onChange={(e) => setData({ ...data, itemName: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="description"
              label="Description"
              variant="outlined"
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="quantity"
              label="Quantity"
              variant="outlined"
              onChange={(e) => setData({ ...data, quantity: e.target.value })}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              id="rate"
              label="Rate"
              variant="outlined"
              onChange={(e) => setData({ ...data, rate: e.target.value })}
            /> */}
      </Grid>
    </div>
  );
}

export default Item;
