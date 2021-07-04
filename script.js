var req = new XMLHttpRequest();
req.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json", true);
req.send();
req.onload = function () {
    data = JSON.parse(this.response);


var state = {
    'querySet': data,
  
    'page': 1,
    'rows': 10,
    'window': 5,
  }
  
  buildTable()
  
  function pagination(querySet, page, rows) {
  
    var trimStart = (page - 1) * rows
    var trimEnd = trimStart + rows
  
    var trimmedData = querySet.slice(trimStart, trimEnd)
  
    var pages = Math.round(querySet.length / rows);
  
    return {
      'querySet': trimmedData,
      'pages': pages,
    }
  }
  
  function pageButtons(pages) {
    var wrapper = document.getElementById('pagination-wrapper')
  
    wrapper.innerHTML = "";
  
    var maxLeft = (state.page - Math.floor(state.window / 2))
    var maxRight = (state.page + Math.floor(state.window / 2))
  
    if (maxLeft < 1) {
      maxLeft = 1
      maxRight = state.window
    }
  
    if (maxRight > pages) {
      maxLeft = pages - (state.window - 1)
  
      if (maxLeft < 1) {
        maxLeft = 1
      }
      maxRight = pages
    }
    for (var page = maxLeft; page <= maxRight; page++) {
      wrapper.innerHTML += `<button value=${page} class="page btn btn-info">${page}</button>`
    }
  
    if (state.page != 1) {
      wrapper.innerHTML = `<button value=${1} class="page btn btn btn-info">&#171; First</button>` + wrapper.innerHTML
    }
  
    if (state.page != pages) {
      wrapper.innerHTML += `<button value=${pages} class="page btn btn-info">Last &#187;</button>`
    }
  
    $('.page').on('click', function() {
      $('#table-body').empty()
  
      state.page = Number($(this).val())
  
      buildTable()
    })
  }
  function buildTable() {
    var table = $('#table-body')
  
    var data = pagination(state.querySet, state.page, state.rows)
    var myList = data.querySet
    console.log('askdgas',myList)
  
    for (var i = 1 in myList) {
      var row = `<tr>
                    <td>${myList[i].id}</td>
                    <td>${myList[i].name}</td>
                    <td>${myList[i].email}</td>
                    `
      table.append(row)
    }
  
    pageButtons(data.pages)
}

}
