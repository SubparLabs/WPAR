<template>
    <div class='wrapper'>
        <div class='text'>
            <h1>page not found</h1>
            <router-link class='link' to='/'><p>go home</p></router-link>
        </div>
    </div>
</template>
<style scoped>
    .wrapper {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        height: 100%;
        width: 100%;
        background-image: url('/img/business.jpg');
        background-repeat: no-repeat;
        background-size: cover;
        background-position-x: 80%;
    }
    .text {
        color: #ffb400;
        text-align: right;
        padding: 10% 5%;
        display: block;
    }
    h1 {
        font-size: 4rem;
        float: right;
    }
    .link {
        color: #7fb000;
        margin-top: 1rem;
        font-size: 2rem;
        text-decoration: none;
    }
</style>
