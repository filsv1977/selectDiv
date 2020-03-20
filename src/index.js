import React from "react";
import {render} from "react-dom";
import {Rnd} from "react-rnd";
import ElementTable from './table'

const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "solid 1px #ddd",
  background: "#f0f0f0"
};


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      width: 200,
      height: 200,
      x: 10,
      y: 10,
      checked:true,
      selRect: {
        selectedArea: false,
        w: 0,
        h: 0,
        x: 0,
        y: 0,
        sx: 0,
        sy: 0
      },
    };
  }

  rect = () => {
    return <div style={{
      width: this.state.selRect.w,
      height: this.state.selRect.h,
      left: this.state.selRect.x,
      top: this.state.selRect.y,
      position: 'relative',
      background: 'none',
      border: 'solid 1px #0F0',
      backgroundClip: 'padding-box',
    }
    }>
    </div>
  };

  getCursorPost = (e) => {
    let ne = e.nativeEvent;
    return {
      x: ne.clientX - e.currentTarget.offsetLeft,
      y: ne.clientY - e.currentTarget.offsetTop
    };
  };

  render() {
    return (
      <div style={{display: 'flex'}}>
        <div style={{width: 200, background: '#777'}}>
          <button type = "checkbox"  name = "first"
                  style ={{height:25, width: 70}}
                  onClick={() => {
            this.setState({checked : !this.state.checked});
            console.log(this.state.checked)
          }}> { String(this.state.checked)}
          </button>

        </div>
        <div style={{height: '800px', width: '100%', background: '#888'}}
             onMouseDown={(e) => {
               if(!this.state.checked) return;

               let pos = this.getCursorPost(e);
               let prev = {...this.state.selRect};
               prev.selectedArea = true;
               prev.x = pos.x;
               prev.y = pos.y;
               prev.w = 0;
               prev.h = 0;
               prev.sx = pos.x;
               prev.sy = pos.y;
               // console.log('md ',newSelRect);
               this.setState({selRect: {...prev}});
             }
             }

             onMouseUp={(e) => {
               if(!this.state.checked) return;

               let prev = {...this.state.selRect};

               let  geometry= this.getCursorPost(e);

               geometry.w = Math.abs(geometry.x - prev.sx);
               geometry.h = Math.abs(geometry.y - prev.sy);

               geometry.x  = (geometry.x - prev.sx)>0 ? prev.sx : geometry.x;
               geometry.y  = (geometry.y - prev.sy)>0 ? prev.sy : geometry.y;

               console.log(geometry);

               prev.selectedArea = false;
               prev.x = 0;
               prev.y = 0;
               prev.w = 0;
               prev.h = 0;
               prev.sx = 0;
               prev.sy = 0;

               this.setState({selRect: {...prev}});
             }}

             onMouseMove={(e) => {
               if(!this.state.checked) return;
               if (this.state.selRect.selectedArea) {

                 let prev = {...this.state.selRect};
                 let pos = this.getCursorPost(e);

                 let dX = pos.x - prev.sx;
                 prev.w = Math.abs(dX);

                 if (dX < 0) {
                   prev.x = prev.sx - prev.w;
                 } else {
                   prev.x = prev.sx;
                 }

                 let dY = pos.y - prev.sy;
                 prev.h = Math.abs(dY);
                 if (dY < 0) {
                   prev.y = prev.sy - prev.h;
                 } else {
                   prev.y = prev.sy;
                 }

                 this.setState({selRect: {...prev}});
               }
             }}>
          <Rnd
            style={style}
            size={{width: this.state.width, height: this.state.height}}
            position={{x: this.state.x, y: this.state.y}}
            onDragStop={(e, d) => {
              this.setState({x: d.x, y: d.y});
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
              this.setState({
                width: ref.style.width,
                height: ref.style.height,
                ...position
              });
            }}
          >
            <ElementTable/>
          </Rnd>
          {this.state.selRect.selectedArea && this.rect()}
        </div>
      </div>
    );
  }
}

render(<App/>, document.getElementById("root"));
