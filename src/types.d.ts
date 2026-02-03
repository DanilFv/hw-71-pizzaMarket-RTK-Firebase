interface IDishForm {
    title: string;
    price: number;
    image: string;
}

interface IDish extends IDishForm {
    id: string;
}

interface IDishApi {
    [key: string]: IDishForm;
}