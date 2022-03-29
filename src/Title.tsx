import { Component, ReactNode } from "react";

export interface ToDo {
    userId: number;
    id: number;
    title: string;
    completed: boolean
}

export interface TitleProps {
    title: string;
    subtitle?: string;
}

export interface TitleState {
    counter: number;
}

export interface MyHttpResponse<T> extends Response {
    parsedBody?: T
}

export async function myhttp<T>(request: RequestInfo): Promise<MyHttpResponse<T>> {
    const response: MyHttpResponse<T> = 
        await fetch(request);

    try {
        const body = await response.json();
        response.parsedBody = body;
    } catch(ex) {
        throw new Error("Indirizzo non risolto");
    }
    if(!response.ok) {
        throw new Error(response.statusText);
    }

    return response;
}


class Title extends Component<TitleProps, TitleState> {

    constructor(props: TitleProps){
        super(props);
        this.state = {
            counter: 0
        }
    }

    render(): ReactNode {
        const {title, subtitle, children} = this.props;
        return (
            <div>
                <h1>{title}</h1>
                <h2>{subtitle}</h2>
                <h3>{this.state.counter}</h3>
                <div>{children}</div>
            </div>
        );
    }

    async componentDidMount() {
    //    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    //    const body = await response.json();
       const response = await myhttp<ToDo>("https://jsonplaceholder.typicode.com/todos");
       console.log(response.status);
       console.log(response.ok);
       console.log(response.parsedBody);
       const postNewtoDo = await myhttp<{id:number}>(
        new Request("https://jsonplaceholder.typicode.com/todos", {
            method: "post",
            body: JSON.stringify({ title: "mio titolo", body: "mio body"})
        })
       );
       console.log(await postNewtoDo);
           
    }


}


export default Title;