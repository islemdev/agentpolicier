import React from "react";


function CinInput() {
    function handleOnClick(e) {
        e.preventDefault();
        console.log('You clicked submit.');
        
      }
  return (
    <div class="find_dowmain">
    <form action="#" class="find_dowmain_form">
        <input type="text" id="cin" placeholder="Type CIN here"/>
        <button onClick={handleOnClick} id="lookup">Lookup</button>
    </form>
</div>
  );
}

export default CinInput;