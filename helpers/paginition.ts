interface ObjectPagination {
    limitItem: number,
    currentPage: number,
    skip?:number,
    totalPage?:number
};

const paginitionHelper = (objectPagination: ObjectPagination, query: Record<string,any>, countTasks: number): ObjectPagination=>{
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);
    }
    if(query.limit){
        objectPagination.limitItem = parseInt(query.limit);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItem;

    const totalPage =Math.ceil(countTasks/objectPagination.limitItem);
    objectPagination.totalPage = totalPage;

    return objectPagination;
}

export default paginitionHelper;