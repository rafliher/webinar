$(document).ready(function() {
    $.get('/api/result', function(response) {
      var data = response.data;
  
      var table = $('#registration-table').DataTable({
        data: data,
        columns: [
          { data: 'name' },
          { data: 'email' },
          { data: 'phone' },
          { data: 'createdAt' },
          { data: 'updatedAt' }
        ]
      });
    });
  });
  