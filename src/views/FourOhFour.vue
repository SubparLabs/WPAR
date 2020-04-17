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
        justify-content: flex-end;
        flex-direction: row;
        height: 100%;
        width: 100%;
        background-image: url('https://www.adweek.com/files/2015_May/iStock-Unfinished-Business-2.jpg');
        background-repeat: no-repeat;
        background-size: cover;
    }
    .text {
        text-align: right;
        padding: 10% 5%;
        display: block;
    }
    h1 {
        font-size: 4rem;
        float: right;
    }
    .link {
        margin-top: 1rem;
        font-size: 2rem;
        color: white;
        text-decoration: none;
    }
</style>
