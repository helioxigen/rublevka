const isJQ = global.config.domain === "jq.estate";

export const additionalSourceOptions = {
  cluster: true,
  clusterRadius: 100
};

const clusteredLayersOptions = [[30, "transparent"], [2, "transparent"]];

export const layers = [
  ...clusteredLayersOptions.map((clusteredLayer, index) => ({
    id: `cluster-${index}`,
    type: "circle",
    source: "markers",
    paint: {
      "circle-color": clusteredLayer[1],
      "circle-radius": 20
    },
    filter:
      index === clusteredLayersOptions.length - 1
        ? [">=", "point_count", clusteredLayer[0]]
        : [
            "all",
            [">=", "point_count", clusteredLayer[0]],
            ["<", "point_count", clusteredLayersOptions[index + 1][0]]
          ]
  })),
  {
    id: "counter-for-clusters",
    type: "symbol",
    source: "markers",
    layout: {
      "icon-image": isJQ ? "cluster" : "clusterPurple",
      "text-field": "{point_count}",
      "text-size": 16,
      "text-font": ["Arial Unicode MS Bold"],
      "icon-offset": [0, 4.5]
    },
    paint: {
      "text-color": "#ffffff"
    }
  },
  {
    id: "unclustered",
    type: "symbol",
    source: "markers",
    layout: {
      "icon-image": "{marker-symbol}"
    }
  }
];

export const center = [37.01086, 55.75592];
