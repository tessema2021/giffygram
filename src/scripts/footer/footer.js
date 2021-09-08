export const footbar = () => {
    return ` <footer class="footer_nav">
        <div class="footer_image">
            <img src="./images/foot.png" alt="footer image" />
        </div>
        <div class="navigation__item navigation__search">
            <input type="text" id="footer_postSearch" placeholder="Search posts..." />
        </div>
        <div class="navigation__item navigation__logout">
            <button id="footer_logout" class="fakeLink">Logout</button>
        </div>
        <div class="footer__item">
                Posts since <select id="yearSelection">
                    <option>2021</option>
                    <option>2020</option>
                    <option>2019</option>
                    <option>2018</option>
                    <option>2017</option>
                </select>
                <span id="postCount">0</span>
            </div>
    </footer>`
}



