<template>
  <div class="container">
    <h1>WPAR: Good Enough.</h1>
    <div class="footer"><p><a href="https://twitter.com/subparr">We have a twitter</a>.</p>
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

.disable-select {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.display {
  display: flex;
  flex-wrap: wrap;

  & > div {
    padding: 1rem;
  }

  a {
    text-decoration: none;
    color: white;
  }


  .banner {
    color: white;
    flex-grow: 1;
    text-align: center;
    width: 100%;

    .letter {
      font-family: "Londrina Outline";
      font-size: 25vw;
      text-align: center;
      text-transform: uppercase;
    }

      @media only screen and (min-width: 1000px) {
        width: unset;

        .letter {
          display: block;
          font-size: 20vh;
        }
      }

    .w-hover:hover {
      color: #ffb400;
    }

    .p-hover:hover {
      color: #00a6ed;
    }

    .a-hover:hover {
      color: #7fb000;
    }
    .r-hover:hover {
      color: #0d2c54;
    }

    .badge {
      font-size: 1.375rem;
      font-weight: 900;
      text-transform: uppercase;
    }
  }

    .header {
      display: block;
      margin-bottom: 10px;
      text-decoration: underline;
      text-transform: uppercase;
    }

  .metadata {
    flex-grow: 4;

    .individual-song {
      .artist {
        font-weight: 900;
      }
    }

    .individual-song:hover {
      color: #0d2c54;
    }

    .now-playing {
      margin-bottom: 20px;
    }
  }
  .schedule {
    flex-grow: 4;

    .show-time {
    text-transform: lowercase;
    }
  }
}

.controls {
  margin-top: 20px;
  text-align: center;

  .playback-controls {
    transition: all .2s ease-in-out;
    cursor: pointer;
    position: relative;
    border: 1px solid white;
    display: inline-block;
    padding: .5rem 1.5rem;
    margin: 0 auto;
    font-size: 2.25rem;
    font-weight: 900;
    line-height: 50px;
    text-align: center;
    width: 148px;

    &:hover {
      background: white;
      color: #FA6000;
    }
  }
}
.container {
  margin: 40px;
}
.footer {
  padding: 25px;
  font-size: 0.7rem;

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
