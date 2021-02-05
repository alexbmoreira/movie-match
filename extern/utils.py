import requests
from bs4 import BeautifulSoup as bs


class Letterboxd():

    @staticmethod
    def get_id(link):
        request = requests.get(link)

        if request.status_code != 200:
            return {"error": "could not GET movie id"}

        page = bs(request.text, "html.parser")

        return {"id": page.body["data-tmdb-id"]}

    @staticmethod
    def get_page_watchlist(page):

        list_html = page.find("ul", class_="poster-list")

        ids = []

        for li in list_html.find_all("li"):
            data = li.div
            movie_id = Letterboxd.get_id(f"https://letterboxd.com/{data['data-target-link']}")

            if "error" not in movie_id:
                ids.append(movie_id)

        return ids

    @staticmethod
    def get_watchlist(username):
        link = f"https://letterboxd.com/{username}/watchlist/"
        request = requests.get(link)

        page = bs(request.text, "html.parser")

        pages = page.find_all("li", class_="paginate-page")
        last_page = pages[-1].text if pages else "0"

        watchlist = []

        try:
            watchlist.extend(Letterboxd.get_page_watchlist(page))

            if int(last_page) > 0:
                for i in range(2, int(last_page) + 1):
                    link = f"https://letterboxd.com/{username}/watchlist/page/{i}"
                    request = requests.get(link)
                    page = bs(request.text, "html.parser")
                    watchlist.extend(Letterboxd.get_page_watchlist(page))

            return watchlist
        except:
            return {"error": "Could not GET watchlist"}

