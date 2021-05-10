export default function ErrorComponent({children}) {
    return  (
        <div className="row justify-content-center mt-2">
            <div className="col-md-8">
                <div className={"alert alert-danger"}>
                    {children}
                </div>
            </div>
        </div>
    )
}
