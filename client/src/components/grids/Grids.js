import "./grids.css";

function Grids() {
  return (
  <div className="grid-container">
  <div > grid-template-columns: repeat(4, 1fr);</div>
  <div>2</div>
  <div>3</div>  
  <div>4</div>
  <div> grid-template-rows: repeat(10, 1fr); </div>
  <div>6</div>  
  <div>7</div>
  <div>8</div>
  <div className="item9">grid-column: 1 / span 3;</div>
  <div>10</div>
  <div className="item11">grid-row: 4 / span 4;</div>  
  <div>12</div>
  <div className="item13">grid-area: 4 / 3 / 8 / 5;</div>
  <div>14</div>  
  <div>15</div>
  <div>16</div>
  <div className="item17"> justify-self: start;</div>
  <div className="item18">justify-self: center;</div>  
  <div className="item19">justify-self: end;</div>  
  <div>20</div>
  <div className="item21">align-self: start;</div>    
  <div className="item22">align-self: center;</div>   
  <div className="item23">align-self: end;</div> 
  <div>24</div>
  <div>25</div>  
  <div>26</div>
  <div>27</div>
  <div>28</div>  
  <div>29</div>
  <div>30</div>
  <div>31</div>
  <div>32</div>  
  <div>33</div>
  <div>34</div>
  <div>35</div>  
  <div>36</div>
  <div>37</div>
</div>
  )
}
export default Grids;
