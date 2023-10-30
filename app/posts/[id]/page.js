export default function postDetailPage({params}){
    console.log(params);
    //{id:"123"}

    const{id} = params;
    return<h1>Detail page-post{id}</h1>
}





