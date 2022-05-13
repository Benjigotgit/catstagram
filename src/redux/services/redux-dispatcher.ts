export class ReduxDispatcher{

    static instance:ReduxDispatcher;
    dispatcher:Function | undefined;
    private constructor(){}

    static getInstance(){
        if(!this.instance)
        this.instance=new ReduxDispatcher();
        return this.instance;
    }

    setDispatcher(dispatch:Function){
        this.dispatcher=dispatch;
    }

    dispatch(actionType:string,payloadData?:any){
        if(this.dispatcher){
            this.dispatcher({type:actionType,payload:payloadData});
        }
    }
}