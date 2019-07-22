// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

#include "pch.h"

#include "RectangleViewManager.h"

#include <Views/ShadowNodeBase.h>

#include <Utils/PropertyUtils.h>
#include <Utils/ValueUtils.h>

#include <winrt/Windows.UI.Xaml.Documents.h>
#include <winrt/Windows.UI.Xaml.Shapes.h>

using namespace ::winrt::Windows::UI::Xaml::Shapes;

namespace winrt {
using namespace Windows::UI::Xaml::Documents;
} // namespace winrt

namespace react {
namespace uwp {

RectangleViewManager::RectangleViewManager(
    const std::shared_ptr<IReactInstance> &reactInstance)
    : Super(reactInstance) {}

const char *RectangleViewManager::GetName() const {
  return "RCTRectangle";
}

XamlView RectangleViewManager::CreateViewCore(int64_t tag) {
  auto rectangle = winrt::Windows::UI::Xaml::Shapes::Rectangle();
  return rectangle;
}

folly::dynamic RectangleViewManager::GetNativeProps() const {
  auto props = Super::GetNativeProps();

  props.update(folly::dynamic::object("Fill", "string")("RadiusX", "string")(
      "RadiusY", "string"));

  return props;
}

void RectangleViewManager::UpdateProperties(
    ShadowNodeBase *nodeToUpdate,
    const folly::dynamic &reactDiffMap) {
  auto rectangle =
      nodeToUpdate->GetView().as<Rectangle>();
  if (rectangle == nullptr)
    return;

  for (const auto &pair : reactDiffMap.items()) {
    const std::string &propertyName = pair.first.getString();
    const folly::dynamic &propertyValue = pair.second;

    if (propertyName == "Fill") {
      if (propertyValue.isString()) {
        rectangle.Fill(SolidColorBrushFromColor(propertyValue.asString()));
      } else if (propertyValue.isNull()) {
        rectangle.ClearValue(Shape::FillProperty());
      }
    }
    else if (propertyName == "RadiusX") {
      if (propertyValue.isString()) {
        rectangle.RadiusX(atof(propertyValue.asString().c_str()));
      } else if (propertyValue.isNull()) {
        rectangle.ClearValue(Rectangle::RadiusXProperty());
      }
    }
    else if (propertyName == "RadiusY") {
      if (propertyValue.isString()) {
        rectangle.RadiusY(atof(propertyValue.asString().c_str()));
      } else if (propertyValue.isNull()) {
        rectangle.ClearValue(Rectangle::RadiusYProperty());
      }
    }
  }
  Super::UpdateProperties(nodeToUpdate, reactDiffMap);
}

void RectangleViewManager::AddView(
    XamlView parent,
    XamlView child,
    int64_t index) {
  assert(false);
}

void RectangleViewManager::RemoveAllChildren(XamlView parent) {
}

void RectangleViewManager::RemoveChildAt(XamlView parent, int64_t index) {
  assert(false);
}

} // namespace uwp
} // namespace react
