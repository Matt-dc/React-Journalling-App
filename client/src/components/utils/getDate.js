export default function getDate(date) {
            var dd = date.getDate()
            var mm = date.getMonth()
          
            var dates = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']
          
            var year = date.getYear()
            var yyyy = year-100
          
            var now = `${dates[mm]} ${dd} ${yyyy}`
            
            return now
          }

