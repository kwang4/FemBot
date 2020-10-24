async function hewwo()
{
    console.log('this is async');
}
new Promise((resolve,reject)=>
{
    hewwo();
})
console.log('this is sync');