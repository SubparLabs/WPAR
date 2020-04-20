<template>
  <div class="container">
    <h1>WPAR: Good Enough.</h1>
    <div class="links"><p><a href="https://twitter.com/subparr">We have a twitter</a>.</p>
    <p><a href="http://subpar.biz">We have another dumb website</a>.</p>
    <p><a href="https://www.linkedin.com/company/subpar-systems">Shit we even have a linkedin</a>.</p>
	    <div class="newsletter">
	    	<p> We probably won't ever send you an email, but here is a newsletter signup: <form action="https://tinyletter.com/subpar" method="post" target="popupwindow" onsubmit="window.open('https://tinyletter.com/subpar', 'popupwindow', 'scrollbars=yes,width=800,height=600');return true"><input type="text" style="width:140px" placeholder="your email" name="email" id="tlemail" /><input type="hidden" value="1" name="embed"/><input type="submit" value="Subscribe" /><a href="https://tinyletter.com" target="_blank"></a></form></p>
	    	 
    	</div>
      <div style='margin-top: 1rem'><router-link to='/'>&#60; go home</router-link></div>
      </div>
  </div>
</template>

<style lang="scss">
.container {
  margin: 40px;
}
.links {
  
  font-size: 0.7rem;
  padding: 20px;

  a {
    text-decoration: none;
    color: white;
  }

  a:hover {
    color: #0d2c54;
  }

  .footer-right {
  float: right;
  }

  .footer-left {
  float: left;
  }

 .newsletter {
	margin-top: 20px;
}
 .newsletter input {
 	margin-right: 10px;
 	margin-top: 5px;
}
}
</style>
