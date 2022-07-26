class Avatar
  COLOR_MAP = {
    red: '#BF0B0B',
    blue: '#208AAE',
    green: '#678D58',
    pink: '#E0777D',
    ruby: '#D52941',
    teal: '#00C2D1',
    viridian: '#32908F',
    saffron: '#F39237',
    marigold: '#ECA400',
    pewter: '#8EA7B8',
    champagne: '#E5CAA6',
    blue_violet: '#6D64B9'
  }.freeze

  def self.initial(name)
    name.chars.first.upcase
  end

  def self.color(key)
    COLOR_MAP[key]
  end
end
