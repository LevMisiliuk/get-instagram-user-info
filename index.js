const { IgApiClient } = require('instagram-private-api');
const ig = new IgApiClient();

async function main() {
    ig.state.generateDevice('USER_NAME'); // Твой юзер нейм, хз зачем, но вроде надо
    await ig.account.login('USER_NAME', 'PASS') // Логин и пароль от аккаунта который будет чекать
    const userSearch = await ig.user.searchExact('USER_TO_CHECK'); // Имя того кого ты будешь чекать
    const followersFeed = ig.feed.accountFollowers(userSearch.pk);
    const followers = await followersFeed.items();
    for (let follower of followers) {
        console.log(follower.username);
    }
}

main().catch(console.error);
