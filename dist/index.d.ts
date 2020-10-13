interface Tree {
    [key: string]: Leaf;
}
declare type Leaf = Promise<Leaf> | Function | Array<any> | Tree;
declare function routree(router: any, tree: Tree): any;
export default routree;
