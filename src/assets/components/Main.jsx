import React from "react";

function Main() {
    const [imgUrl, setImgUrl] = React.useState("https://picsum.photos/200/300");
    const [isLoading, setIsLoading] = React.useState(false);

    //console.log("Main Rendering");

    function getImage() {
        setIsLoading(true);

        fetch("https://picsum.photos/v2/list?page=2&limit=100")
            .then((res) => res.json())
            .then((data) => {
                const rI = Math.floor(Math.random() * data.length);
                setImgUrl(data[rI].download_url);
                setIsLoading(false);
            })
        .catch(err => {
            console.error("Failed to get image!", err);
        })
        ;
    }

    React.useEffect(function () {
        getImage();
    }, []);

    return (
        <main>
            <button onClick={getImage}>Change Image</button>
            {isLoading && <p>LOADING</p>}
            <img src={imgUrl} />
        </main>
    );
}

export default Main;
